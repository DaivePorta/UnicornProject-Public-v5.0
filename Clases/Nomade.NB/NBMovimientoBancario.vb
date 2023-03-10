Public Class NBMovimientoBancario

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub


    Public Function CrearMovimientoBancarioDetalle(ByVal p_oficina As String, ByVal p_descripcion As String, ByVal p_canal As String,
                                                   ByVal p_nro_operacion As String, ByVal p_fecha_ope As String, ByVal p_monto As String,
                                                   ByVal p_tc As String, ByVal p_fecha_valor As String, ByVal p_completo_ind As String, ByVal p_usua_id As String, ByVal p_scsl_code As String,
                                                    ByVal p_tipo_movimiento As String, ByVal p_pidm As String, ByVal p_cta_code As String,
                                                    Optional ByVal p_tipo_ingreso As String = "", Optional ByVal p_tipo_operacion As String = "") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand


            cmd = cn.GetNewCommand("PFB_CREAR_MOVIMIENTO_BANCARIO_DETALLE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OFICINA", p_oficina, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANAL", p_canal, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_OPERACION", p_nro_operacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_OPE", p_fecha_ope, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TC", p_tc, ParameterDirection.Input, 253))
            If p_fecha_valor = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VALOR", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VALOR", p_fecha_valor, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_completo_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_MOVIMIENTO", p_tipo_movimiento, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CODE", p_cta_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_INGRESO", p_tipo_ingreso, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_OPERACION", p_tipo_operacion, ParameterDirection.Input, 253))



            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try


    End Function

    Public Function ActualizarMovimientoBancarioDetalle(ByVal p_CODIGO As String, ByVal p_oficina As String, ByVal p_descripcion As String, ByVal p_canal As String,
                                                 ByVal p_nro_operacion As String, ByVal p_fecha_ope As String, ByVal p_monto As String,
                                                 ByVal p_tc As String, ByVal p_fecha_valor As String, ByVal p_completo_ind As String, ByVal p_usua_id As String, ByVal p_scsl_code As String,
                                                  ByVal p_tipo_movimiento As String, ByVal p_pidm As String, ByVal p_cta_code As String, ByVal p_tope As String, ByVal p_PIDM_cliente As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand


            cmd = cn.GetNewCommand("PFB_ACTUALIZAR_MOVIMIENTO_BANCARIO_DETALLE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OFICINA", p_oficina, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANAL", p_canal, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_OPERACION", p_nro_operacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_OPE", p_fecha_ope, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TC", p_tc, ParameterDirection.Input, 253))
            If p_fecha_valor = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VALOR", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VALOR", p_fecha_valor, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_completo_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_MOVIMIENTO", p_tipo_movimiento, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CODE", p_cta_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_OPERACION", p_tope, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_CLIENTE", p_PIDM_cliente, ParameterDirection.Input, 253))




            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try


    End Function



    Public Function CrearSaldoInicialCuenta(ByVal p_fecha_apertura As String, ByVal p_monto_apertura As String, ByVal p_pidm As String, ByVal p_cuenta_code As String, ByVal p_usua_id As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_MOVIMIENTO_BANCARIO_SALDO_INICIAL", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_APERTURA", p_fecha_apertura, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_APERTURA", p_monto_apertura, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_CODE", p_cuenta_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", p_usua_id, ParameterDirection.Input, 253))



            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarMovimientoBancario(ByVal p_MES As String, ByVal p_ANHO As String, ByVal p_CERRADO_IND As String, ByVal p_CUENTA_CODE As String, ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_MOVIMIENTO_BANCARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANHO", p_ANHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CERRADO_IND", p_CERRADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_CODE", p_CUENTA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))

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

    Public Function ListarMovimientoBancarioDetalle(ByVal p_CODE As String, Optional ByVal p_CODE_DET As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_MOVIMIENTO_BANCARIO_DETALLE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_DET", p_CODE_DET, ParameterDirection.Input, 253))

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

End Class
