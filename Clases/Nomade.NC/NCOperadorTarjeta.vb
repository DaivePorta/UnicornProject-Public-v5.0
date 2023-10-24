Public Class NCOperadorTarjeta
    Private cn As Nomade.Connection

    Public Sub New(ByVal str As String)
        cn = New Connection(str)
    End Sub

    Public Function ListarOperadorTarjeta(ByVal p_codigo As String, ByVal estado As String, Optional ByVal p_ctlg_code As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PMN_LISTAR_OPERADOR_TARJETA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function CrearOperadorTarjeta(ByVal p_pidm As String, ByVal marcas() As String) As String
        Try

            Dim codigo As String = "00000"

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            Dim mtar As New NCMarcaTarjeta("BN")
            Dim dt = mtar.ListarMarcaTarjetaPorOperador(" ", "A")

            Dim loContiene As Boolean = False
            'If Not dt Is Nothing Then
            '    If dt.Rows.Count > 0 Then
            '        For Each row In dt.Rows
            '            loContiene = marcas.Contains(row("CODIGO_MARCA").ToString())
            '            If loContiene Then
            '                Exit For
            '            End If
            '        Next
            '    End If
            'End If

            If Not loContiene Then
                cmd = cn.GetNewCommand("PMN_CREAR_GENERICO", CommandType.StoredProcedure)
                cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", "OPERADOR TARJETA " & p_pidm, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_DEPEND_CODE", "00002", ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", "A", ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_COMENTARIO", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR1", p_pidm, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR2", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR3", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR4", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR5", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR6", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR7", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR8", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR9", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR10", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))

                cmd1 = cn.Ejecuta_parms(cmd)
                codigo = cmd1.Parameters("@P_CODE").Value
                cmd = Nothing

                If Not codigo = "00000" And Not codigo Is Nothing Then
                    For Each marca As String In marcas
                        cmd = cn.GetNewCommand("PMN_CREAR_GENERICO", CommandType.StoredProcedure)
                        cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", "OPERADOR MARCA " & codigo, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_DEPEND_CODE", "00003", ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", "A", ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_COMENTARIO", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR1", codigo, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR2", marca, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR3", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR4", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR5", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR6", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR7", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR8", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR9", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR10", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))

                        cmd1 = cn.Ejecuta_parms(cmd)
                    Next
                End If
            End If

            Return codigo

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ActualizarOperadorTarjeta(ByVal codigo As String, ByVal p_pidm As String, ByVal marcas() As String) As String
        Try

            Dim msg As String = "ERROR"

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            Dim mtar As New NCMarcaTarjeta("BN")
            Dim dt = mtar.ListarMarcaTarjetaPorOperador(" ", "A")

            dt = IIf(dt Is Nothing, New DataTable(), dt)

            Dim loContiene As Boolean = False
            If Not dt Is Nothing Then
                For Each row In dt.Rows
                    loContiene = marcas.Contains(row("CODIGO_MARCA").ToString())
                    If loContiene Then
                        Exit For
                    End If
                Next
            End If

            If Not loContiene Then
                cmd = cn.GetNewCommand("PMN_ACTUALIZAR_OPERADOR_TARJETA", CommandType.StoredProcedure)
                cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", codigo, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", p_pidm, ParameterDirection.Input, 253))

                cmd1 = cn.Ejecuta_parms(cmd)
                cmd = Nothing

                If Not marcas Is Nothing Then
                    For Each marca As String In marcas
                        cmd = cn.GetNewCommand("PMN_CREAR_GENERICO", CommandType.StoredProcedure)
                        cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", "OPERADOR MARCA " & codigo, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_DEPEND_CODE", "00003", ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", "A", ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_COMENTARIO", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR1", codigo, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR2", marca, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR3", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR4", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR5", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR6", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR7", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR8", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR9", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR10", Nothing, ParameterDirection.Input, 253))
                        cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))

                        cmd1 = cn.Ejecuta_parms(cmd)
                    Next
                End If
                msg = "OK"
            End If

            Return msg

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function CrearCuentaOperador(ByVal p_optr As String, ByVal p_ctlg_code As String, ByVal p_cuen_code As String, ByVal p_cuen_tipo As String, ByVal p_vigencia As String) As String
        Try

            Dim msg As String = "ERROR"

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            Dim dt As DataTable = ListarCuentasPorOperador(p_optr, p_cuen_tipo)
            Dim cont As Boolean = False

            If Not dt Is Nothing Then
                If dt.Rows.Count > 0 Then
                    For Each row In dt.Rows
                        cont = (row("OPTR_CODE").ToString().Equals(p_optr) And row("CUEN_CODE").ToString().Equals(p_cuen_code))
                    Next
                End If
            End If

            If Not cont Then
                cmd = cn.GetNewCommand("PMN_CREAR_GENERICO", CommandType.StoredProcedure)
                cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", "CUENTA OPERADOR " & p_optr, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_DEPEND_CODE", "00004", ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", "I", ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_COMENTARIO", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR1", p_optr, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR2", p_ctlg_code, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR3", p_cuen_code, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR4", p_cuen_tipo, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR5", p_vigencia, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR6", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR7", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR8", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR9", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR10", Nothing, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))

                cmd1 = cn.Ejecuta_parms(cmd)

                msg = "OK"

                Dim codigo = cmd1.Parameters("@p_CODE").Value
                ActualizarCuentaOperador(codigo)

                cmd = Nothing
            End If

            Return msg

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ActualizarCuentaOperador(ByVal omtc_code As String) As String
        Try
            Dim msg As String = "ERROR"

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PMN_ACTUALIZAR_CUENTA_OPERADOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_OMTC_CODE", omtc_code, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            cmd = Nothing

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ActualizarMarcaOperador(ByVal omtr_code As String, ByVal estado As String) As String
        Try
            Dim msg As String = "ERROR"

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PMN_ACTUALIZAR_MARCA_OPERADOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_OMTR_CODE", omtr_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", estado, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            cmd = Nothing

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ListarCuentasPorOperador(ByVal p_optr As String, ByVal tipo As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PMN_LISTAR_CUENTAS_POR_OPERADOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPTR_CODE", p_optr, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", tipo, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ListarComisionesOperador(ByVal P_CODE As String, ByVal P_OPTR_CODE As String, ByVal P_ESTADO_IND As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PMN_LISTAR_COMISIONES_OPERADOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_OPTR_CODE", P_OPTR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))

            Dim oDT As New DataTable
            oDT = cn.Consulta(cmd)

            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function CrearComisionesOperador(ByVal P_OPTR_CODE As String, ByVal P_COMISION_TOTAL_DEB As String, ByVal P_COMISION_TOTAL_CRE As String, ByVal P_COMISION_EMISORES As String,
                                            ByVal P_COMISION_OPERADOR As String, ByVal P_IGV As String, ByVal P_USUA_ID As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PMN_CREAR_COMISIONES_OPERADOR", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_OPTR_CODE", P_OPTR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COMISION_TOTAL_DEB", P_COMISION_TOTAL_DEB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COMISION_TOTAL_CRE", P_COMISION_TOTAL_CRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COMISION_EMISORES", P_COMISION_EMISORES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COMISION_OPERADOR", P_COMISION_OPERADOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_IGV", P_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@P_CODE").Value

            Return msg
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ActualizarComisionesOperador(ByVal P_CODE As String, ByVal P_OPTR_CODE As String, ByVal P_COMISION_TOTAL_DEB As String, ByVal P_COMISION_TOTAL_CRE As String, ByVal P_COMISION_EMISORES As String,
                                            ByVal P_COMISION_OPERADOR As String, ByVal P_IGV As String, ByVal P_USUA_ID As String, ByVal P_ESTADO_IND As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PMN_ACTUALIZAR_COMISIONES_OPERADOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_OPTR_CODE", P_OPTR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COMISION_TOTAL_DEB", P_COMISION_TOTAL_DEB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COMISION_TOTAL_CRE", P_COMISION_TOTAL_CRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COMISION_EMISORES", P_COMISION_EMISORES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COMISION_OPERADOR", P_COMISION_OPERADOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_IGV", P_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function CambiarEstadoComisiones(ByVal P_CODIGO As String, ByVal P_USUA_ID As String) As String
        Try
            Dim estado As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PMN_CAMBIAR_ESTADO_COMISIONES_OPERADOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", P_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            estado = cmd1.Parameters("@P_ESTADO").Value

            Return estado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarComisionesOperador(ByVal p_codigo As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_COMISIONES_OPERADOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", p_codigo, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function
End Class
