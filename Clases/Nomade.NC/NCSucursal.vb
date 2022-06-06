Public Class NCSucursal
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarSucursal(ByVal p_codigoemp As String, ByVal p_codigosuc As String, ByVal p_estado As String, Optional ByVal p_exonerado As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_SUCURSAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_codigoemp, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_codigosuc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EXONERADO", p_exonerado, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)



            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarSucursalUsuario(ByVal p_codigosuc As String, ByVal p_codigoemp As String, ByVal p_estado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_SUCURSAL_USUARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_codigoemp, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_codigosuc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)



            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarSucursalFeriado(ByVal p_CTLG_CODE As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_SUCURSAL_FERIADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)



            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ActualizarSucursal(ByVal p_codiemp As String, ByVal p_codisuc As String, ByVal p_COD_EST_SUNAT As String,
                                       ByVal p_desc As String, ByVal p_propie As String,
                                       ByVal p_direc As String, ByVal p_tel As String,
                                       ByVal p_fini As String, ByVal p_ubigeo As String, ByVal p_Urban As String,
                                       ByVal p_fterm As String, ByVal p_estado As String,
                                       ByVal p_user As String, ByVal p_establecimiento As String,
                                       ByVal p_pais As String, p_bio_ind As String, Optional ByVal p_exonerado As String = "") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_SUCURSAL", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_codiemp, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codisuc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_EST_SUNAT", p_COD_EST_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_desc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROPIETARIO", p_propie, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_direc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TELEFONO", p_tel, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UBIGEO", p_ubigeo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_URBAN", p_Urban, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_fini, ParameterDirection.Input, 253))
            If p_fterm = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TERMINO", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TERMINO", p_fterm, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIES", p_establecimiento, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAIS", p_pais, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MESG", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EXONERADO", p_exonerado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BIO_IND", p_bio_ind, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_MESG").Value


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearSucursal(ByVal p_codiemp As String, ByVal p_COD_EST_SUNAT As String,
                                       ByVal p_desc As String, ByVal p_propie As String,
                                       ByVal p_direc As String, ByVal p_tel As String,
                                       ByVal p_fini As String, ByVal p_ubigeo As String, ByVal p_Urban As String,
                                       ByVal p_fterm As String, ByVal p_estado As String,
                                       ByVal p_user As String, ByVal p_establecimiento As String,
                                       ByVal p_pais As String, p_bio_ind As String, Optional ByVal p_exonerado As String = "") As Array

        Try
            Dim msg(2) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_SUCURSAL", CommandType.StoredProcedure)


            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_codiemp, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_EST_SUNAT", p_COD_EST_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_desc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROPIETARIO", p_propie, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_direc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TELEFONO", p_tel, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UBIGEO", p_ubigeo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_URBAN", p_Urban, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_fini, ParameterDirection.Input, 253))
            If p_fterm = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TERMINO", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TERMINO", p_fterm, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIES", p_establecimiento, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAIS", p_pais, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EXONERADO", p_exonerado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BIO_IND", p_bio_ind, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd1.Parameters("@p_CODE").Value
            msg(1) = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function CambiarEstadoSucursal(ByVal p_codigo As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_SUCURSAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)



            msg = cmd1.Parameters("@p_ESTADO").Value


            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class