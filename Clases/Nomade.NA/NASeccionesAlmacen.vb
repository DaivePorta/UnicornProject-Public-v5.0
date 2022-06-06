Public Class NASeccionesAlmacen

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarSeccionAlmacen(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFA_LISTAR_SECCIONES_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EMPRESA", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMACEN", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
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

    'Public Function CambiarEstadoSeccionAlmacen(ByVal p_CODE As String) As Array
    '    Try

    '        Dim msg(1) As String
    '        Dim cmd As IDbCommand
    '        Dim cmd1 As IDbCommand

    '        cmd = cn.GetNewCommand("PFA_CAMBIAR_ESTADO_SECCIONES_ALMACEN", CommandType.StoredProcedure)
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))

    '        cmd1 = cn.Ejecuta_parms(cmd)
    '        msg(0) = cmd1.Parameters("@p_ESTADO").Value
    '        Return msg
    '    Catch ex As Exception
    '        Throw (ex)
    '    End Try
    'End Function


    Public Function ActualizarSeccionAlmacen(ByVal p_codigo As String, ByVal p_ctlg_code As String,
                                   ByVal p_almc_code As String, ByVal p_desc As String,
                                   ByVal p_tipo_almacen As String, ByVal p_tipo_almacenaje As String,
                                   ByVal p_estado_ind As String, ByVal p_usua_id As String,
                                   ByVal p_sistema_almacenaje As String, ByVal p_paletizado_ind As String,
                                   ByVal p_nro_palets As String, Optional ByVal p_COSTO_SECCION As String = "0") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFA_ACTUALIZAR_SECCIONES_ALMACEN", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_almc_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_desc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_ALMACEN", p_tipo_almacen, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_ALMACENAJE", p_tipo_almacenaje, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SISTEMA_ALMACENAJE", p_sistema_almacenaje, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PALETIZADO_IND", p_paletizado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_PALETS", p_nro_palets, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COSTO_SECCION", p_COSTO_SECCION, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearSeccionAlmacen(ByVal p_ctlg_code As String,
                                   ByVal p_almc_code As String, ByVal p_desc As String,
                                   ByVal p_tipo_almacen As String, ByVal p_tipo_almacenaje As String,
                                   ByVal p_estado_ind As String, ByVal p_usua_id As String,
                                   ByVal p_sistema_almacenaje As String, ByVal p_paletizado_ind As String,
                                   ByVal p_nro_palets As String, Optional ByVal p_COSTO_SECCION As String = "0") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFA_CREAR_SECCIONES_ALMACEN", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_almc_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_desc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_ALMACEN", p_tipo_almacen, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_ALMACENAJE", p_tipo_almacenaje, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SISTEMA_ALMACENAJE", p_sistema_almacenaje, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PALETIZADO_IND", p_paletizado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_PALETS", p_nro_palets, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COSTO_SECCION", p_COSTO_SECCION, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function




End Class
